import React from "react";

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
    return (
        <ul className="list">
            {items.map((item, index) => (
                <li key={index} className="list-item">
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}
