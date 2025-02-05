export const buildUrl = ({ sortBy, sortOrder, categories, platforms, playType, page }) => {
    const urlParts = [`/games/${sortBy}/${sortOrder}`];
  
    if (categories && categories.length > 0) {
      urlParts.push(`categories/${categories.join(',')}`);
    }
  
    if (platforms && platforms.length > 0) {
      urlParts.push(`platforms/${platforms.join(',')}`);
    }
  
    if (playType) {
      urlParts.push(`play_type/${playType}`);
    }
  
    urlParts.push(`page/${page}`);
  
    return urlParts.join('/');
  };
  