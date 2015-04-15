

def main():
    f = open('asteroid.txt', 'r')
    sql = open('mysqlAsteroid.txt', 'w')

    for line in f:
        array = line.split()
        print(array[1] + "\n")

        for x in range(len(array)):

            for ch in ['/',',','(', ')', '\'']:
                if ch in array[x]:
                    array[x]=array[x].replace(ch,'')

        string = "UPDATE `space`.star SET name = '" + name + " WHERE starId = " + i + ";"

        name = ""
        eI = 0

        for x in range(len(array)):
            if x==0:
                continue

            if array[x] == "57000":
                eI = x
                break
            else:
                name += array[x]

        if len(array) == eI + 11:
            array[eI + 9] += " " + array[eI + 10]

        sql.write(string + "\nVALUES ('" + array[eI] + "', '" + name  + "', " + array[eI + 1] + ", " + array[eI + 3] + ", " + array[eI + 4] + ", " + array[eI + 5] + ", " + array[eI + 6] + ", " + array[eI + 8] + ", '" + array[eI + 9] + "');\n")

    f.close()
    sql.close()

if __name__ == "__main__":
    main()