"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagInputProps {
  placeholder?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  label?: string;
}

export function TagInput({ placeholder, tags, setTags, label }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-semibold opacity-80">{label}</label>}
      <div className="flex gap-2">
        <Input
          placeholder={placeholder || "Add a skill..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow rounded-xl h-12"
        />
        <Button 
          type="button" 
          onClick={addTag} 
          variant="secondary"
          className="rounded-xl h-12 w-12 p-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="pl-3 pr-1 py-1 gap-1 text-sm rounded-full bg-primary/10 text-primary border-primary/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </Badge>
        ))}
        {tags.length === 0 && (
          <p className="text-xs text-muted-foreground italic mt-2">No tags added yet</p>
        )}
      </div>
    </div>
  );
}
