import { Test, TestingModule } from '@nestjs/testing';
import { fizzbuzz } from './fizzbuzzz';
import assert from 'node:assert/strict';

describe('fizzbuzz', () => {
  it("devrait retouner '1' si l'input est 1", () => {
    expect(fizzbuzz(1)).toBe(1);
  });

  it("devrait retourner '2'", () => {
    expect(fizzbuzz(2)).toBe(2);
  });

  it("devrait retouner 'fizz' si l'input est 3", () => {
    expect(fizzbuzz(3)).toBe('fizz');
  })

  it("devrait retouner '4' si l'input est 4", () => {
    expect(fizzbuzz(4)).toBe(4);
  })

  it("devrait retouner 'buzz' si l'input est 5", () => {
    expect(fizzbuzz(5)).toBe('buzz');
  });

  it("devrait retouner 'fizz' si l'input est 6", () => {
    expect(fizzbuzz(6)).toBe('fizz');
  });

  // it("devrait retouner 'fizzbuzz' si l'input est 15", () => {
  //   expect(fizzbuzz(15)).toBe('fizzbuzz');
  // })
});


