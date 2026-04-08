import { Client, Query, TablesDB, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID; // for metrics
const FAVORITES_TABLE_ID = import.meta.env.VITE_APPWRITE_FAVORITES_TABLE_ID;// for favorites
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID; 

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(PROJECT_ID); // Your project ID

const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
    console.log(DATABASE_ID, TABLE_ID, PROJECT_ID, searchTerm, movie);
    // 1. Use Appwrite SDK to check if the searchTerm exists in the db.
    try {
        const result = await database.listRows({
            databaseId: DATABASE_ID, 
            tableId: TABLE_ID, 
            queries: [
                Query.equal("searchTerm", searchTerm)
            ]
        });
        
        // 2. If it exists, update the count by incrementing it by 1.
        if(result.total > 0) {
            const record = result.rows[0]; // get the first record that matches the searchTerm
            await database.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: record.$id,
                data: {
                    "count": record.count + 1
                }
            });
        } else {
            // 3. If it does not exist, create a new record with the searchTerm and set the count to 1.
            await database.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(), // generate a unique ID for the new record
                data: {
                    "searchTerm": searchTerm,
                    "count": 1,
                    "poster_url": movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png',
                    "movie_id": movie.id
                }
            });
        }
    } catch (error) {
        console.error("Error updating search count: ", error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.limit(5), // limit the results to the top 5 trending movies based on search count
                Query.orderDesc("count") // order the results in descending order based on the count
            ]
        });
        return result;
    } catch (error) {
        console.error("Error fetching trending movies: ", error);
    }
};

// Helper functions for favorites
export const addFavorite = async (userId, movie) => { // should take movie object because we need the poster path to display the favorite movies in the profile page
    try {
        if (!userId) {
            throw new Error("User ID is required to add a favorite.");
        }
        if (!movie || !movie.id) {
            throw new Error("Movie ID is required to add a favorite.");
        }

        const existingFavorite = await database.listRows({
            databaseId: DATABASE_ID,
            tableId: FAVORITES_TABLE_ID,
            queries: [
                Query.equal("userId", userId),
                Query.equal("movieId", String(movie.id))
            ]
        })
        if(existingFavorite.total > 0) {
            console.log("Movie is already in favorites.");
            return { ok: true, status: "already_exists", message: "Movie is already in favorites." }; // return early if the movie is already in favorites
        }

        await database.createRow({
            databaseId: DATABASE_ID,
            tableId: FAVORITES_TABLE_ID,
            rowId: ID.unique(),
            data: {
                "userId": userId,
                "movieId": String(movie.id),
                "title": movie.title,
                "posterPath": movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png',
            }
        })        
        return { ok: true, status: "added", message: "Movie added to favorites successfully." };

    } catch (error) {
        console.error("Error adding favorite: ", error);
        return { ok: false, status: "error", message: error.message };
    }
}

export const removeFavorite = async (userId, movieId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required to remove a favorite.");
        }
        if (!movieId) {
            throw new Error("Movie ID is required to remove a favorite.");
        }
        const existingFavorite = await database.listRows({
            databaseId: DATABASE_ID,
            tableId: FAVORITES_TABLE_ID,
            queries: [
                Query.equal("userId", userId),
                Query.equal("movieId", String(movieId))
            ]
        })

        if(existingFavorite.total === 0) {
            console.log("Movie is not in favorites.");
            return { ok: true, status: "not_found", message: "Movie is not in favorites. Cannot delete." }; // return early if the movie is not in favorites
        } else {
            const result = await database.deleteRow({
                databaseId: DATABASE_ID,
                tableId: FAVORITES_TABLE_ID,
                rowId: existingFavorite.rows[0].$id
            })
            if(result) {
                return { ok: true, status: "removed", message: "Movie removed from favorites successfully." };
            } else {
                throw new Error("Failed to remove favorite. Please try again.");
            }
        }
    } catch (error) {
        console.error("Error removing favorite: ", error);
        return { ok: false, status: "error", message: error.message };
    }
}

export const isFavorited = async (userId, movieId) => {
    try {
        if(!userId) {
            throw new Error("User ID is required to check favorites.");
        }
        if(!movieId) {
            throw new Error("Movie ID is required to check favorites.");
        }

        const result = await database.listRows({
            databaseId: DATABASE_ID,
            tableId: FAVORITES_TABLE_ID,
            queries: [
                Query.equal("userId", userId),
                Query.equal("movieId", String(movieId))
            ]
        })
        if(result.total > 0) { // movie already favorited by the user
            return { ok: true, status: "favorited", message: "Movie is in favorites." };
        } else {
            return { ok: true, status: "not_favorited", message: "Movie is not in favorites." };
        }
    } catch (error) {
        console.error("Error checking if movie is favorited: ", error);
        return { ok: false, status: "error", message: error.message };
    }
}