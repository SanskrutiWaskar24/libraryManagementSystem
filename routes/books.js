const express = require("express");

const { users } = require("../data/users.json");

const { books } = require("../data/books.json");
const router = express.Router();
module.exports = router;


// route :/books
// method :  get
// description : get all the books
// acess: public
// parameteers : none

router.get("/", (req,res)=>{
    res.status(200).json({
        success: true,
        message: "got all the books...",
        data: books,
    })
});


// route :/books/issued
// method :  get
// description : get all the issued books
// acess: public
// parameteers : none


router.get("/issued", (req,res)=>{
    const userWithIssuedBook = users.filter((each)=>{
        if(each.issuedBook) return each
    });
    const issuedBooks = [];

    userWithIssuedBook.forEach((each)=>{
        const book = books.find((book)=> (book.id ===each.issuedBook));
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book,returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message:"no book have been issued yet..."
        });
    }
    return res.status(200).json({
            success:true,
            message : "users with the issued book...",
            data:issuedBooks,
        })

})

// route :/:id
// method :  get
// description : get the books by their id
// acess: public
// parameteers : none
router.get("/:id",(req,res)=>{
    const id = req.params.id;
    const book = books.find((each)=> each.id ===id);
    if(!book){
       return res.status(404).json({
        success: false,
        message : "book not found"
       })
    }
    return res.status(200).json({
        success:true,
        message:"book found",
        data:book,
    })
})

