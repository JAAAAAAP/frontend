export const actualSortBy = (sortBy) => {
    switch (sortBy) {
      case 'Name': return 'title';
      case 'Download': return 'Download';
      case 'Likes': return 'likes_count';
      case 'Date': return 'created_at';
      case 'Rating': return 'reviews_avg_rating';
      default: return 'title';
    }
  };
  
  export const actualSortOrder = (sortOrder) => {
    switch (sortOrder) {
      case 'A-Z': return 'asc';
      case 'Z-A': return 'desc';
      case 'Most-Downloads': return 'desc';
      case 'Least-Downloads': return 'asc';
      case 'Most-Likes': return 'desc';
      case 'Least-Likes': return 'asc';
      case 'Newest': return 'desc';
      case 'Oldest': return 'asc';
      case 'Highest-Rating': return 'desc';
      case 'Lowest-Rating': return 'asc';
      default: return 'asc';
    }
  };
  