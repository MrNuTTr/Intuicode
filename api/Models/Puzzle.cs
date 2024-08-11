
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Intuicode.Models
{
    public enum PuzzleDifficulty
    {
        Trivial, Easy, Simple, Manageable, Challenging,
        Tough, Hard, Complex, Intense, Extreme
    }

    public class Puzzle
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }

        [JsonProperty(PropertyName = "difficulty")]
        public PuzzleDifficulty Difficulty { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "sequenceNumber")]
        public int SequenceNumber { get; set; }

        [JsonProperty(PropertyName = "code")]
        public Dictionary<string, PuzzleCode> Code { get; set; }

        [JsonProperty(PropertyName = "hints")]
        public List<string> Hints { get; set; }

        [JsonProperty(PropertyName = "tags")]
        public List<string> Tags { get; set; }
    }

    public class PuzzleCode
    {
        [JsonProperty(PropertyName = "startCode")]
        public string StartCode { get; set; }

        [JsonProperty(PropertyName = "testCases")]
        public List<TestCase> TestCases { get; set; }
    }

    public class TestCase
    {
        [JsonProperty(PropertyName = "timeoutSeconds")]
        public int TimeoutSeconds { get; set; }

        [JsonProperty(PropertyName = "setupCode")]
        public string SetupCode { get; set; }

        [JsonProperty(PropertyName = "testCode")]
        public string TestCode { get; set; }

        [JsonProperty(PropertyName = "hidden")]
        public bool Hidden { get; set; }
    }
}
