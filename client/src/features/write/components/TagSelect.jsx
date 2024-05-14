import React, { useState, useEffect } from "react";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import useApi from "../../../hooks/useApi";

const TagSelect = ({ tags, onChange }) => {
  const [tagArray, setTagArray] = useState([]);
  const { fetchTags } = useApi();

  useEffect(() => {
    fetchTags(setTagArray);
  }, []);

  const parsedArray = tagArray.filter(
    (item) => !tags.some((tag) => tag.name === item.name)
  );

  const handleTagSelect = (selectedId) => {
    const item = tagArray.find((item) => item.id === selectedId);
    onChange(item);
  };

  return (
    <Select
      aria-label="mood-select"
      onSelectionChange={handleTagSelect}
      isDisabled={parsedArray.length === 0}
    >
      <Button className="mood-select">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover className="mood-popover">
        <ListBox className="listbox" items={parsedArray}>
          {(item) => (
            <ListBoxItem
              key={item.name}
              className="item"
              value={item.name}
              textValue={item.name}
            >
              <div
                className="mood-color"
                style={{ background: item.color }}
              ></div>
              <div>{item.name}</div>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default TagSelect;
