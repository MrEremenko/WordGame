package com.wordgame.repositories;

import com.wordgame.entities.Games;
import com.wordgame.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
}
