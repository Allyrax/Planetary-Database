import random

def main():
    sql = open('mysqlGalaxy.txt', 'w')


    string = "INSERT INTO `space`.galaxy (name, type, diameter, thickness, mass, spiralPeriod, barPeriod)"

    typeList = ['Peculiar galaxies', 'Dwarf galaxy', 'Spiral galaxy', 'Barred spiral galaxy', 'Elliptical galaxy']

    nameList = 'Carleen Cheslock Xenia Xu  Leola Larkin  Crista Calvi  Otis Ohlinger  Perry Peres  Alethea Adamo  Stephanie Sarkis  Theresa Touchton  Colette Choate  Vernia Vittetoe  Elroy Emmert  Jani Joslyn  Blondell Beckles  Loris Lightner  Armando Aubert  India Italiano  Marquitta Mann  Josephine Jaggers  Gail Gracey  Allena Aguinaga  Manual Murdock  Drusilla Dufour  Cindi Condrey  Tashina Thorn  Marlene Moffet  Helaine Haymon  Eleanor Eastman  Margarette Manross  Barry Barnhardt  Vera Vanbeek  Crystle Coughlin  Iva Igoe  Kathleen Kuether  Martin Molinaro  Leonila Lamacchia  Michale Mccollister  Shila Shindler  Coleen Cervantez  Carolynn Camel  Ardella Arambula  Ashely Arvizu  Jacqualine Jarnagin  Lonna Lupercio  Leanna Ludwick  Grady Go  Juliette Jaillet  Earlene Epling  Josiah Javier  Xiomara Xavier'.split()

    for x in range(49):
        type = random.choice(typeList)
        name = nameList[x]
        sql.write(string + "\nVALUES ('" + name + "', '" + type  + "', " + str(random.randrange(50, 200)) + ", " + str(random.randrange(1, 3)) + ", " + str(random.randrange(1, 5)) + ", " + str(random.randrange(50, 400)) + ", " + str(random.randrange(30, 200)) + ");\n")

    sql.close()

if __name__ == "__main__":
    main()