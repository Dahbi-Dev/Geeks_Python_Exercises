interface Responsee<T> {
    status: number;
    data: T;
    error?: string;
}

function parseResponse<T>(response: Responsee<T>): T | string {
    if (response.status === 200) {
        return response.data;
    } else {
        return response.error || "An error occurred";
    }
}

const successResponse: Responsee<{ id: number; name: string }> = {
    status: 200,
    data: { id: 1, name: "Item 1" }
};