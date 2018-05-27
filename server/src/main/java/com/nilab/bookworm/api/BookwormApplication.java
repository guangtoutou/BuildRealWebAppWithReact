package com.nilab.bookworm.api;

import com.nilab.bookworm.api.model.ApplicationUser;
import com.nilab.bookworm.api.repo.UserRepository;
import com.nilab.bookworm.api.security.TokenProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Properties;

@RestController
@SpringBootApplication
public class BookwormApplication {
	@Value("${app.jwtSecret}")
	private String jwtSecret;

	@Value("${app.jwtExpirationInMs}")
	private int jwtExpirationInMs;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	public JavaMailSender emailSender;

	public static void main(String[] args) {
		SpringApplication.run(BookwormApplication.class, args);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody ApplicationUser userForm) {
		userForm.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));

		if (userRepository.existsByUsername(userForm.getUsername())) {
			return new ResponseEntity("Username is already taken!",
					HttpStatus.BAD_REQUEST);
		}

		ApplicationUser user = userRepository.save(userForm);

		String token = tokenProvider.generateToken(user);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", token);
		headers.add("Access-Control-Expose-Headers", "Authorization");
		return new ResponseEntity<>(user, headers, HttpStatus.OK);
	}

	@GetMapping("/email")
	public ResponseEntity<?> sendEmail(){
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("guangtoutou@yeah.net");
		message.setTo("ni.ningning@gmail.com");
		message.setSubject("this is a test");
		message.setText("this is a test");
		emailSender.send(message);

		return new ResponseEntity(HttpStatus.OK);
	}


}