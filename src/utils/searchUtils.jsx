
export const highlightAndFormatText = (text, query) => {
  if (!query) {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const queries = query.trim().split(/\s+/);
  const regex = new RegExp(`(${queries.join('|')})`, 'gi');

  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span key={index} className="font-medium bg-yellow-300">
          {part}
        </span>
      );
    } else {
      return part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  });
};

export const handleInputChange = (e, setQuery, setShowSuggestions) => {
  setQuery(e.target.value);
  setShowSuggestions(true);
};

export const handleKeyDown = (
  e,
  data,
  selectedIndex,
  setSelectedIndex,
  navigate,
  query,
  setQuery,
  setShowSuggestions
) => {
  const games = data?.data?.games || [];
  const users = data?.data?.users || [];
  const suggestions = [...games, ...users];

  if (e.key === "ArrowDown") {
    setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
  } else if (e.key === "ArrowUp") {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
  } else if (e.key === "Enter") {
    // ตรวจสอบว่า selectedIndex ถูกต้องและมีค่าใน suggestions
    if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
      const selectedSuggestion = suggestions[selectedIndex];

      if (selectedSuggestion.type === "game") {
        navigate(`/game/${selectedSuggestion.title}`);
      } else if (selectedSuggestion.type === "user") {
        navigate(`/user/${selectedSuggestion.name}`);
      }

      setQuery(
        selectedSuggestion.type === "game"
          ? selectedSuggestion.title
          : selectedSuggestion.name
      );
      setShowSuggestions(false);
    } else if ((query?.trim() || "") !== "") {

      const formattedQuery = query.trim().replace(/\s+/g, "-");
      // กรณีไม่มีคำแนะนำ แต่มีคำค้นหา
      navigate(`/search/${formattedQuery}`);
      setShowSuggestions(false);
    }
  }
};


export const handleSuggestionClick = (
  value,
  query,
  navigate,
  setQuery,
  setShowSuggestions
) => {
  if (value) {
    if (value.type === "game") {
      navigate(`/game/${value.title}`);
    } else if (value.type === "user") {
      navigate(`/Profile/${value.name.trim().replace(/\s+/g, "-")}`);
    }
    setQuery(value.type === "game" ? value.title : value.name);
  } else if ((query?.trim() || "") !== "") {
    const formattedQuery = query.trim().replace(/\s+/g, "-");
    // กรณีไม่มีคำแนะนำ แต่มีคำค้นหา
    navigate(`/search/${formattedQuery}`);
    setShowSuggestions(false);
  }
  setShowSuggestions(false);
};
