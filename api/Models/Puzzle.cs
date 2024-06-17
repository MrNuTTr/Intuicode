
using System.Collections.Generic;

namespace Intuicode.Models
{
    public class Puzzle
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int SequenceNumber { get; set; }
        public Dictionary<string, PuzzleCode> Code { get; set; }
        public List<string> Hints { get; set; }
        public List<string> Tags { get; set; }
    }

    public class PuzzleCode
    {
        public int TimeoutSeconds { get; set; }
        public string StartCode { get; set; }
        public string AssertCode { get; set; }
    }
}
