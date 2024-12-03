import { NextResponse } from "next/server";
interface Book {
  id: number;
  title: string;
  author: string;
  image: string,
  available: boolean;
}

let books: Book[] = [
  {
    id: 1,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    image: "https://cdn.prod.website-files.com/5f64a4eb5a48d21969aa774a/5fa7aa399ad1b450ce6ecf55_rich-dad-poor-dad.jpg",
    available: true
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://duabookpalace.com/cdn/shop/products/dua-book-palace-online-atomic-habits-38340136173800.jpg?v=1663838030&width=533",
    available: true
  },
  {
    id: 3,
    title: "$100 Million Dollar Offer",
    author: "Alex Hormozi",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627034891i/58612786.jpg",
    available: true
  },
  {
    id: 4,
    title: "$100 Million Dollar lead",
    author: "Alex Hormozi",
    image: "https://book-shelf.pk/cdn/shop/files/100MLeadsbyAlexHormozi-Bookshelf.pk.jpg?v=1692740897",
    available: true
  },
  {
    id: 5,
    title: "Diary of a CEO",
    author: "Steven bartlett",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2R8h097hr9LnQLvoa8aBPlhEtrGyFgAPA2w&s",
    available: true
  },
  {
    id: 6,
    title: "Feel Good Productivity",
    author: "Ali Abdaal",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689695229i/142402923.jpg",
    available: true
  },
  {
    id: 7,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    image: "https://miro.medium.com/v2/resize:fit:1200/0*tjjVWoTGZzfhOLTO.jpg",
    available: true
  },
  {
    id: 8,
    title: " A Approach to Living a Good Life",
    author: "Mark Manson",
    image: "https://readings.com.pk/images/books/9780062457714.jpg",
    available:true
  },
];

// GET Method
export async function GET() {
  return NextResponse.json(books, { status: 200 });
}

// POST Method
export async function POST(req: Request) {
  try {
    const newBook: Book = await req.json();
    books.push({ ...newBook, id: books.length + 1 });
    return NextResponse.json({ message: "Book added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding book!",error }, { status: 500 });
  }
}

// PUT Method
export async function PUT(req: Request) {
  try {
    const updatedBook: Book = await req.json();
    books = books.map((book) =>
      book.id === updatedBook.id ? { ...book, ...updatedBook } : book
    );
    return NextResponse.json({ message: "Book updated successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating book!",error }, { status: 500 });
  }
}

// DELETE Method
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    books = books.filter((book) => book.id !== id);
    return NextResponse.json({ message: "Book deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting book!",error }, { status: 500 });
  }
}
