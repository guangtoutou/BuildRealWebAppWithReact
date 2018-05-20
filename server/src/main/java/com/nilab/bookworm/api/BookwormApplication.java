package com.nilab.bookworm.api;

import com.nilab.bookworm.api.model.ApplicationUser;
import com.nilab.bookworm.api.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class BookwormApplication {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder  bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(BookwormApplication.class, args);
	}

	@PostMapping("/signup")
	public ResponseEntity<ApplicationUser> signup(@RequestBody ApplicationUser userForm){
		userForm.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));
		ApplicationUser user = userRepository.save(userForm);
		return ResponseEntity.ok(user);
	}
}