package com.nilab.bookworm.api.repo;

import com.nilab.bookworm.api.model.ApplicationUser;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<ApplicationUser, Long> {

	public ApplicationUser findApplicationUserByUsername(String username);

	Boolean existsByUsername(String username);

}
