package com.wordgame.repositories;

import com.wordgame.entities.Guesses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuessesRepository extends JpaRepository<Guesses, Integer> {
}
