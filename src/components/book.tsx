"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Book = {
    id: number;
    title: string;
    author: string;
    image: string;
    available: boolean;
};

function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    // Remove newBook and setNewBook if they are not being used
    // const [newBook, setNewBook] = useState<{
    //     title: string;
    //     author: string;
    //     image: string | File;
    //     available: boolean;
    // }>({
    //     title: "",
    //     author: "",
    //     image: "",
    //     available: true,
    // });

    const [editBook, setEditBook] = useState<Book | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("/api/books");
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const updateBook = async () => {
        try {
            await fetch("/api/books", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editBook),
            });
            setEditBook(null);
            fetchBooks();
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            await fetch("/api/books", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="m-12 p-8 bg-black via-blue-800 to-black min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-serif font-extrabold text-white mb-8 text-center drop-shadow-lg hover:text-green-200">Book List</h1>

            <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.length > 0 ? (
                    books.map((book) => (
                        <li
                            key={book.id}
                            className="bg-blue-950 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
                        >
                            <Image
                                src={book.image}
                                alt={book.title}
                                width={200}
                                height={200}
                                className="rounded-xl object-cover w-full h-[300px] mb-4 border-2 border-gray-700"
                            />
                            <h2 className="text-center font-semibold text-2xl text-green-200 mb-2">
                                {book.title}
                            </h2>
                            <p className="text-center text-lg text-white mb-2">
                                Author: {book.author}
                            </p>
                            <p className="text-center font-medium text-lg mb-4 text-gray-400">
                                Status:{' '}
                                <span
                                    className={book.available ? 'text-green-300' : 'text-red-400'}
                                >
                                    {book.available ? 'Available' : 'Not Available'}
                                </span>
                            </p>
                            <div className="flex justify-center gap-6">
                                <button
                                    className="bg-teal-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-teal-600 transition-all duration-300"
                                    onClick={() => setEditBook(book)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-red-700 transition-all duration-300"
                                    onClick={() => deleteBook(book.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500">
                        No books available.
                    </p>
                )}
            </ul>

            {editBook && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-blue-900 p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold text-teal-300 mb-4">
                            Edit Book
                        </h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editBook.title}
                            onChange={(e) =>
                                setEditBook({ ...editBook, title: e.target.value })
                            }
                            className="block w-full p-2 mb-4 border rounded-md bg-gray-900 text-white border-gray-700 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            value={editBook.author}
                            onChange={(e) =>
                                setEditBook({ ...editBook, author: e.target.value })
                            }
                            className="block w-full p-2 mb-4 border rounded-md bg-gray-900 text-white border-gray-700 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setEditBook((prev) =>
                                        prev ? { ...prev, image: URL.createObjectURL(file) } : null
                                    );
                                }
                            }}
                            className="block w-full mb-4 text-gray-400"
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-all duration-300"
                                onClick={updateBook}
                            >
                                Save Changes
                            </button>
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-300"
                                onClick={() => setEditBook(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Books;
