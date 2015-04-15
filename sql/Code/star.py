import random

def main():

    f = open('star.txt', 'r')
    sql = open('mysqlStarUpdate.txt', 'w')

    i = 0;

    for line in f:
        i += 1;
        array = line.split(',')
        print(array[0] + "\n")

        name = array[0];


        #select a random galaxyId
        galaxyId = random.randrange(1, 51)

        string = "UPDATE `space`.star SET name = '" + name + "' WHERE starId = " + str(i) + ";\n"

        sql.write(string)

    f.close()
    sql.close()

if __name__ == "__main__":
    main()