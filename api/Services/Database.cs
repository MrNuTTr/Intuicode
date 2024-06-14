using Microsoft.Azure.Cosmos;
using System.Threading.Tasks;
using System;
using Intuicode.Models;
using System.Collections.Generic;

namespace Intuicode.Services
{
    public class Database : IDatabase
    {
        private readonly CosmosClient _cosmosClient;
        private readonly Container _puzzleContainer;

        public Database()
        {
            string endpointUrl = Environment.GetEnvironmentVariable("COSMOS_ENDPOINT_URL");
            string authorizationKey = Environment.GetEnvironmentVariable("COSMOS_AUTH_KEY");
            string databaseId = Environment.GetEnvironmentVariable("COSMOS_DB_ID");
            string containerId = Environment.GetEnvironmentVariable("COSMOS_CONTAINER_PUZZLE");

            _cosmosClient = new CosmosClient(endpointUrl, authorizationKey);
            _puzzleContainer = _cosmosClient.GetContainer(databaseId, containerId);
        }

        public async Task<Puzzle> GetPuzzleAsync(string puzzleId)
        {
            ItemResponse<Puzzle> response = await _puzzleContainer.ReadItemAsync<Puzzle>(puzzleId, new PartitionKey(puzzleId));
            return response.Resource;
        }

        public async Task<List<Puzzle>> GetPuzzleListAsync(string category = "") 
        {
            var q = "SELECT * FROM c";

            if (!string.IsNullOrEmpty(category))
            {
                q += $" WHERE c.category = '{category}'";
            }

            var queryDefinition = new QueryDefinition(q);
            var queryResultSetIterator = _puzzleContainer.GetItemQueryIterator<Puzzle>(queryDefinition);

            List<Puzzle> results = new List<Puzzle>();
            while (queryResultSetIterator.HasMoreResults)
            {
                var currentResultSet = await queryResultSetIterator.ReadNextAsync();
                foreach (var result in currentResultSet)
                {
                    results.Add(result);
                }
            }

            return results;
        }
    }
}
