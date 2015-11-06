from random import randrange, getrandbits
from itertools import repeat

def isProbablePrime(n, t = 7):
    """Miller-Rabin primality test"""

    def isComposite(a):
        """Check if n is composite"""
        if pow(a, d, n) == 1:
            return False
        for i in range(s):
            if pow(a, 2 ** i * d, n) == n - 1:
                return False
        return True

    assert n > 0
    if n < 3:
        return [False, False, True][n]
    elif not n & 1:
        return False
    else:
        s, d = 0, n - 1
        while not d & 1:
            s += 1
            d >>= 1
    for _ in repeat(None, t):
        if isComposite(randrange(2, n)):
            return False
    return True

def getPrime(n):
    """Get a n-bit prime"""

    p = getrandbits(n)
    while not isProbablePrime(p):
        p = getrandbits(n)

    return p

if __name__ == "__main__":

    # check if the Mersenne number 2**520 - 1 is prime
    print(isProbablePrime(2**520 - 1))

    # check if the Mersenne number 2**607 - 1 is prime
    print(isProbablePrime(2**607 - 1))

    # get a random prime 500 bits long
    print(getPrime(500))
