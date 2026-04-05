import { Client, Query, TablesDB, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
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