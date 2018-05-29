package com.nilab.bookworm.api.model;


import lombok.Data;

@Data
public class Book {
	private long goodreadsId;
	private String title;
	private String authors;
	private String covers;
	private int pages;

	public Book(long goodreadsId, String title, String authors, String covers, int pages) {
		this.goodreadsId = goodreadsId;
		this.title = title;
		this.authors = authors;
		this.covers = covers;
		this.pages = pages;
	}


}
