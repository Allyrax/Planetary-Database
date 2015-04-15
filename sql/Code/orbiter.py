import random

def main():
    sql = open('mysqlOrbiter.txt', 'w')

    string = "INSERT INTO `space`.starOrbiter (starId, asteroidId)"

    secondStar = False
    newStar = False
    starId = 1

    for x in range(3997):

        asteroidId = x + 1
        sql.write(string + "\nVALUES (" + str(starId) + ", " + str(asteroidId) + ");\n")

        if newStar:
            if random.randrange(0, 11) == 0:
                starIdNew = starId + 1
                secondStar = True

        if secondStar:
            sql.write(string + "\nVALUES (" + str(starIdNew) + ", " + str(asteroidId) + ");\n")

        newStar = False
        if random.uniform(0,10) > 8.67:
            newStar = True
            if secondStar:
                starId += 1
            secondStar = False
            starId += 1
    sql.close()

if __name__ == "__main__":
    main()