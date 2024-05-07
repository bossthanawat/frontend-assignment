"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Item = {
  type: "Fruit" | "Vegetable";
  name: string;
};

const initialItems: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);

  const moveItem = (item: Item, type: "Fruit" | "Vegetable") => {
    setItems((prev) => prev.filter((i) => i !== item));
    type === "Fruit"
      ? setFruits((prev) => [...prev, item])
      : setVegetables((prev) => [...prev, item]);
  };

  const resetItem = (item: Item) => {
    const type = item.type;
    type === "Fruit"
      ? setFruits((prev) => prev.filter((fruit) => fruit !== item))
      : setVegetables((prev) => prev.filter((veg) => veg !== item));
    setItems((prev) => [...prev, item]);
  };

  const handleItemClick = (item: Item) => {
    moveItem(item, item.type);
  };

  const handleColumnClick = (item: Item) => {
    resetItem(item);
  };

  return (
    <>
      <div className="container mt-10 max-w-4xl">
        <div>
          <h1 className="text-xl font-bold">Todo List</h1>
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            <div>
              <div className="flex flex-col gap-2">
                {items.map((item, index) => (
                  <Button
                    key={index}
                    variant={"secondary"}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      item.type === "Fruit"
                        ? "text-yellow-600"
                        : "text-green-600"
                    )}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col h-full min-h-40 border rounded-lg overflow-hidden">
              <p className="text-center font-bold p-2 bg-yellow-300">Fruits</p>
              <div className="flex flex-col gap-2 p-2">
                {fruits.map((item) => (
                  <ButtonItem
                    key={item.name}
                    label={item.name}
                    onClick={() => handleColumnClick(item)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col h-full min-h-40 border rounded-lg overflow-hidden">
              <p className="text-center font-bold p-2 bg-green-300">
                Vegetables
              </p>
              <div className="flex flex-col gap-2 p-2">
                {vegetables.map((item) => (
                  <ButtonItem
                    key={item.name}
                    label={item.name}
                    onClick={() => handleColumnClick(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type ButtonItemProps = {
  label: string;
  onClick: () => void;
};

const ButtonItem = ({ label, onClick }: ButtonItemProps) => {
  const time = 5;
  const [duration, setDuration] = useState(time);

  useEffect(() => {
    const timeout = setTimeout(onClick, time * 1000);
    const timer = setInterval(() => {
      setDuration((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Button variant={"secondary"} onClick={onClick}>
        {label}<span className="text-xs text-gray-400 ml-1">({duration})</span>
      </Button>
    </div>
  );
};
