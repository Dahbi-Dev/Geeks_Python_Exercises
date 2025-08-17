import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, clearError } from "../store/dataSlice";

const DataList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="data-list">
            <h2>Posts</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className="data-item">
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
