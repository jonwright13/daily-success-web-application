const TagContainer = ({ tag, onRemove }) => {
  return (
    <div className="mood-item-container" style={{ background: tag.color }}>
      <p>{tag.name}</p>
      <div
        className="remove-button"
        style={{
          background: tag.color,
          border: `1px solid ${tag.color}`,
        }}
        onClick={() => onRemove(tag)}
      >
        X
      </div>
    </div>
  );
};

const TagSelectionContainer = ({ tags, onRemove }) => {
  const handleRemoveTag = (m) => {
    onRemove(m);
  };

  if (tags) {
    return (
      <div className="mood-selection">
        {tags.map((tag) => (
          <TagContainer key={tag.id} tag={tag} onRemove={handleRemoveTag} />
        ))}
      </div>
    );
  }
};

export default TagSelectionContainer;
