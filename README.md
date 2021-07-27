# TCC APP
Este projeto é destinado para o APLICATIVO projeto de TCC Companheiro Fiel da ETEC JARDIM ANGELA.<br>
Você pode também visualizar o SITE, DASHBORD e API (que o aplicativo usa) no seguinte repositório: https://github.com/IgorSPessoa/tcc

# Tecnologias
- Ionic
- Angular
- Typescript
- SCSS

# Plugins
Utilizamos os seguintes Plugins:
- HTTP (https://ionicframework.com/docs/native/http) - Conexões com a API
- STORAGE (https://ionicframework.com/docs/native/native-storage) - Para armazenar dados no dispositivo do cliente
- GEOLOCATION (https://ionicframework.com/docs/native/geolocation) - Para obter dados sobre a localização do usuário via GPS, tais como longitude e latitude
- GEOCODER (https://ionicframework.com/docs/native/native-geocoder) - Para conversões de LatLng em endereço e vice-versa
- CAMERA (https://ionicframework.com/docs/native/camera) - Para uso da câmera do dispositivo
- PHOTOVIEWER (https://ionicframework.com/docs/native/photo-viewer) - Para visualização da imagem em tela cheia
- FILEAPI (https://ionicframework.com/docs/native/file) - Para obter dados do celular do usuário

# Funcionalidades
- Comunicação com uma API: Utilizamos uma API WEB PHP para fazer a conexão de dados do aplicativo com o banco de dados (MySQL), para tanto, utilizamos o Plugin HTTP;
- Armazenagem de dados: Utilizamos o Ionic Storage para guardar dados e poder utilizar em todas as páginas que queremos;
- Modal e Alerts: Utilizamos modais (https://ionicframework.com/docs/api/modal) e alertas do IONIC (https://ionicframework.com/docs/api/alert) em diversas páginas;
- Listas dinâmicas: As páginas de adoção, reports e ongs contam com lista dinâmicamente criadas;
- Fullscreen image: Utilizamos o plugin Photoviewer para fornecer uma melhor visualização de imagens a nossos usuários;
- Obter fotos da galeria ou tirar novas: Você pode escolher uma foto da galera ou tirar uma foto para ser enviados através de nossa API, tanto em reports ou para seu perfil. Para tanto, utilizamos os Plugin de Câmera e FileAPI do ionic;
- Geolocalização e geocoder: Utilizamos ambos plugins para fazer diversas funcionalidades, por exemplo, obter coordenadas geográficas do dispositivo atual.
- GOOGLE API: Utilizamos a API AutoComplete do Google (https://developers.google.com/maps/documentation/javascript/examples/places-queryprediction);
- Ion-Menu: Utilizamos o Plugin para um menu simples, mas eficaz (https://ionicframework.com/docs/api/menu).

# Screenshots
Página de login<br>
<img src="https://user-images.githubusercontent.com/82242086/127235341-a5edcf3b-98d9-4f8c-ab7d-4296dc920cdc.jpg" width="300" height="600">

Página de criação de conta<br>
<img src="https://user-images.githubusercontent.com/82242086/127235348-73488107-0a1f-49c2-af89-b50c7eb6c3fc.jpg" width="300" height="600">

Sistema de carregamento usando ion-skeleton<br>
<img src="https://user-images.githubusercontent.com/82242086/127235365-3b1ac0ed-52dd-49c3-a3b5-d314780fa918.jpg" width="300" height="600">

Página de ONGs<br>
<img src="https://user-images.githubusercontent.com/82242086/127235456-dc67c53d-4f87-40e9-8492-55ed92ba964f.jpg" width="300" height="600">

Página de perfil de uma ONG<br>
<img src="https://user-images.githubusercontent.com/82242086/127235504-90fad2e8-2fea-44c3-a3ea-bd8b535fd46f.jpg" width="300" height="600">

Menu do aplicativo<br>
<img src="https://user-images.githubusercontent.com/82242086/127235479-16eca423-e318-4751-9c84-0c210ce4d36c.jpg" width="300" height="600">

# Equipe
<b>Guilherme Parnaíba De Lima:</b> Front-end e back-end do aplicativo;<br>
<b>Igor Santos Pessoa:</b> Front-end do aplicativo;
