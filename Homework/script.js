// Display a message in the output section
function displayMessage(message, type = 'info') {
    const output = document.getElementById('output');
    output.className = `alert alert-${type}`;
    output.innerText = message;
}

// Display error for specific field
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.classList.remove('d-none');
    element.innerText = message;
}

// Hide error for specific field
function hideError(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('d-none');
}

// Book Class
class Book {
    constructor(title, author, isbn, availableCopies = 1) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    borrowBook() {
        if (this.availableCopies > 0) {
            this.availableCopies--;
        } else {
            throw new Error('No available copies to borrow.');
        }
    }

    returnBook() {
        this.availableCopies++;
    }
}

// User Class
class User {
    constructor(name, userType) {
        if (this.constructor === User) {
            throw new Error('Abstract class User cannot be instantiated directly.');
        }
        this.name = name;
        this.userType = userType;
        this.borrowedBooks = [];
    }

    borrow(book) {
        throw new Error('Abstract method "borrow" must be implemented.');
    }

    return(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
            book.returnBook();
        } else {
            throw new Error('This book was not borrowed by the user.');
        }
    }
}

// Student Class
class Student extends User {
    constructor(name) {
        super(name, 'Student');
    }

    borrow(book) {
        if (this.borrowedBooks.length < 3) {
            book.borrowBook();
            this.borrowedBooks.push(book);
        } else {
            throw new Error('Student cannot borrow more than 3 books.');
        }
    }
}

// Teacher Class
class Teacher extends User {
    constructor(name) {
        super(name, 'Teacher');
    }

    borrow(book) {
        if (this.borrowedBooks.length < 5) {
            book.borrowBook();
            this.borrowedBooks.push(book);
        } else {
            throw new Error('Teacher cannot borrow more than 5 books.');
        }
    }
}

// Library Class
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    // Updated method to find user by both name and type
    findUser(name, type) {
        return this.users.find(u => u.name === name && u.userType === type);
    }

    borrowBook(user, book) {
        user.borrow(book);
    }

    returnBook(user, book) {
        user.return(book);
    }

    listAvailableBooks() {
        return this.books.filter(book => book.availableCopies > 0);
    }
}

// Initialize Library
const library = new Library();

// Event Listener for Adding a User
document.getElementById('addUser').addEventListener('click', () => {
    const userType = document.getElementById('userType').value;
    const userName = document.getElementById('userName').value.trim();

    let isValid = true;
    if (!userType) {
        showError('userTypeError', 'Please select a user type.');
        isValid = false;
    } else {
        hideError('userTypeError');
    }

    if (!userName) {
        showError('userNameError', 'Please enter a user name.');
        isValid = false;
    } else {
        hideError('userNameError');
    }

    if (!isValid) return;

    let user;
    if (userType === 'Student') {
        user = new Student(userName);
    } else {
        user = new Teacher(userName);
    }

    library.addUser(user);
    displayMessage(`Added ${userType}: ${userName}`, 'success');
});

// Event Listener for Adding a Book
document.getElementById('addBook').addEventListener('click', () => {
    const bookTitle = document.getElementById('bookTitle').value.trim();

    if (!bookTitle) {
        showError('bookTitleError', 'Please enter a book title.');
        return;
    } else {
        hideError('bookTitleError');
    }

    const bookAuthor = document.getElementById('bookAuthor').value.trim() || 'Unknown';
    const book = new Book(bookTitle, bookAuthor, '000000000', 1);
    library.addBook(book);
    displayMessage(`Added Book: ${bookTitle}`, 'success');
});

// Event Listener for Borrowing a Book
document.getElementById('borrowBook').addEventListener('click', () => {
    const userType = document.getElementById('actionUserType').value;
    const userName = document.getElementById('actionUserName').value.trim();
    const bookTitle = document.getElementById('actionBookTitle').value.trim();

    let isValid = true;
    if (!userType) {
        showError('actionUserTypeError', 'Please select a user type.');
        isValid = false;
    } else {
        hideError('actionUserTypeError');
    }

    if (!userName) {
        showError('actionUserNameError', 'Please enter a user name for action.');
        isValid = false;
    } else {
        hideError('actionUserNameError');
    }

    if (!bookTitle) {
        showError('actionBookTitleError', 'Please enter a book title for action.');
        isValid = false;
    } else {
        hideError('actionBookTitleError');
    }

    if (!isValid) return;

    const user = library.findUser(userName, userType); // Find user by both name and type
    const book = library.books.find(b => b.title === bookTitle);

    if (user && book) {
        try {
            library.borrowBook(user, book);
            displayMessage(`${userName} borrowed ${bookTitle}`, 'success');
        } catch (error) {
            displayMessage(error.message, 'danger');
        }
    } else {
        displayMessage('User or Book not found.', 'danger');
    }
});

// Event Listener for Returning a Book
document.getElementById('returnBook').addEventListener('click', () => {
    const userType = document.getElementById('actionUserType').value;
    const userName = document.getElementById('actionUserName').value.trim();
    const bookTitle = document.getElementById('actionBookTitle').value.trim();

    let isValid = true;
    if (!userType) {
        showError('actionUserTypeError', 'Please select a user type.');
        isValid = false;
    } else {
        hideError('actionUserTypeError');
    }

    if (!userName) {
        showError('actionUserNameError', 'Please enter a user name for action.');
        isValid = false;
    } else {
        hideError('actionUserNameError');
    }

    if (!bookTitle) {
        showError('actionBookTitleError', 'Please enter a book title for action.');
        isValid = false;
    } else {
        hideError('actionBookTitleError');
    }

    if (!isValid) return;

    const user = library.findUser(userName, userType); // Find user by both name and type
    const book = library.books.find(b => b.title === bookTitle);

    if (user && book) {
        try {
            library.returnBook(user, book);
            displayMessage(`${userName} returned ${bookTitle}`, 'success');
        } catch (error) {
            displayMessage(error.message, 'danger');
        }
    } else {
        displayMessage('User or Book not found.', 'danger');
    }
});

// Event Listener for Listing Available Books
document.getElementById('listBooks').addEventListener('click', () => {
    const availableBooks = library.listAvailableBooks()
        .map(book => `${book.title} by ${book.author} - Copies: ${book.availableCopies}`)
        .join('\n');
    displayMessage(availableBooks || 'No available books', 'info');
});

// Event Listener for Listing Borrowed Books by a User
document.getElementById('listBorrowedBooks').addEventListener('click', () => {
    const userType = document.getElementById('userType').value;
    const userName = document.getElementById('userName').value.trim();
    const user = library.findUser(userName, userType); // Find user by both name and type

    if (user) {
        const borrowedBooks = user.borrowedBooks.map(book => book.title).join(', ');
        displayMessage(borrowedBooks ? `${userName} borrowed: ${borrowedBooks}` : `${userName} has not borrowed any books.`, 'info');
    } else {
        displayMessage('User not found', 'danger');
    }
});
