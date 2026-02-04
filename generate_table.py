
def get_folder(code):
    if 1110 <= code <= 1119: return 'B'
    if 2001 <= code <= 2012: return 'A'
    if 3001 <= code <= 3012: return 'C'
    return 'B'

data = [
    (1110, 4, 2, '89,04', 'P33', 'T01'),
    (1111, 4, 2, '89,24', 'P34', 'T02'),
    (1112, 4, 2, '89,20', 'P35', 'T03'),
    (1113, 4, 2, '89,13', 'P36', 'T04'),
    (1114, 4, 2, '88,65', 'P37', 'T05'),
    (1115, 4, 2, '88,77', 'P38', 'T06'),
    (1116, 4, 2, '89,33', 'P39', 'T07'),
    (1117, 4, 2, '89,21', 'P40', 'T08'),
    (1118, 4, 2, '89,31', 'P41', 'T09'),
    (1119, 4, 2, '88,77', 'P42', 'T10'),
    (2001, 4, 2, '89,97', 'P48', 'T11'),
    (2002, 4, 2, '89,79', 'P49', 'T12'),
    (2003, 4, 2, '89,76', 'P50', 'T13'),
    (2004, 4, 2, '89,77', 'P51', 'T14'),
    (2005, 4, 2, '89,76', 'P52', 'T15'),
    (2006, 4, 2, '89,79', 'P53', 'T16'),
    (2007, 4, 2, '89,79', 'P54', 'T17'),
    (2008, 4, 2, '89,77', 'P55', 'T18'),
    (2009, 4, 2, '89,74', 'P56', 'T19'),
    (2010, 4, 2, '89,79', 'P57', 'T20'),
    (2011, 4, 2, '89,79', 'P58', 'T21'),
    (2012, 4, 2, '89,80', 'P59', 'T22'),
    (3001, 4, 2, '89,80', 'P84', 'T51'),
    (3002, 4, 2, '89,74', 'P85', 'T52'),
    (3003, 4, 2, '89,75', 'P86', 'T53'),
    (3004, 4, 2, '89,73', 'P87', 'T54'),
    (3005, 4, 2, '89,77', 'P88', 'T55'),
    (3006, 4, 2, '89,79', 'P89', 'T56'),
    (3007, 4, 2, '89,78', 'P90', 'T57'),
    (3008, 4, 2, '89,77', 'P91', 'T58'),
    (3009, 4, 2, '89,76', 'P92', 'T59'),
    (3010, 4, 2, '89,78', 'P93', 'T60'),
    (3011, 4, 2, '89,74', 'P94', 'T61'),
    (3012, 4, 2, '89,78', 'P95', 'T62'),
]

print('                    <!-- Tabla de Viviendas -->')
print('                    <div class=\"table-responsive mt-5 mb-5\">')
print('                        <table class=\"table table-striped table-hover text-center align-middle border\">')
print('                            <thead class=\"table-secondary\">')
print('                                <tr>')
print('                                    <th>Código vivienda</th>')
print('                                    <th>Nº Dormitorios</th>')
print('                                    <th>Nº Baños</th>')
print('                                    <th>Superficie Útil (m²)</th>')
print('                                    <th>Código Garaje</th>')
print('                                    <th>Código Trastero</th>')
print('                                    <th>Planos</th>')
print('                                </tr>')
print('                            </thead>')
print('                            <tbody>')
for row in data:
    code = row[0]
    folder = get_folder(code)
    # Using forward slashes for web compatibility, user can handle filesystem differences if any
    link = f'pdf/Fichas_4D/{folder}/{code}.pdf'
    print(f'                                <tr><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td><td>{row[5]}</td><td><a href=\"{link}\" class=\"btn btn-sm btn-outline-dark\" download>Descargar</a></td></tr>')
print('                            </tbody>')
print('                        </table>')
print('                    </div>')
