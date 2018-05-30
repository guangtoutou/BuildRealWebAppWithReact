package com.nilab.bookworm.api.controllers;

import com.nilab.bookworm.api.model.Book;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class BookController {
	@GetMapping("/books/search")
	public ResponseEntity<List<Book>> search() {
		List<Book> result = Arrays.asList(
				new Book(1, "1984", "Orwell", "https://images.gr-assets.com/books/1348990566l/5470.jpg", 198),
				new Book(2, "Three Men in a Boat", "Jerome K. Jerome", "https://images.gr-assets.com/books/1392791656l/4921.jpg", 198)
		);

		return ResponseEntity.ok(result);
	}
}
