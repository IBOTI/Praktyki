
// tworzymy domkniecie (closure) po to, aby uniknac ryzyka nadpisania 
// innych zmiennych i funkcji w projekcie
// więcej o domknieciach mozna poczytac np. tutaj: 
//
// http://blog.nebula.us/13-javascript-closures-czyli-zrozumiec-i-wykorzystac-domkniecia
// 
// w tym przypadku stosujemy tzw. samowykonujaca sie funkcje - Immediately Invoked Function Expression
// ktorej podstawowa konstrukcja wyglada nastepujaco:
//
// (function() {
//  
// })();

(function() {
  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " active";
  }

  // aby przeniesc obsluge zdarzenia "click" z pliku HTML do tego pliku
  // musimy za pomoca JS pobrac z drzewa DOM (struktury HTML) te elementy
  // ktore po kliknieciu maja powodowac zmiane slajdu
  // w naszym projekcie beda to wszystkie elementy o klasie .dot
  // no to pobieramy ;)
  //
  // Ps. bede trzymac sie skladni ES5, tak aby kod byl spojny

  var nav = document.querySelectorAll(".dot");

  // dla pewnosci sprawdzam, czy udalo sie znalezc takie elementy
  // o jakie nam chodzilo - jesli tak, to kod znajdujacy sie
  // w ponizszej instrukcji warunkowej wykona sie

  if (nav.length) {

    // poniewaz spodziewamy sie ze takich takich elementow na stronie
    // moze byc kilka, a zmienna nav przechowuje kolekcje (tablice) tych elementow
    // to aby do kazdego z nich dodac obsluge zdarzenia, musimy zastosowac petle
    // tak, aby przejsc po kolei po kazdym elemencie tablicy nav i do kazdego
    // dodac event listener
    // zamiast klasycznej petli for, zastosujemy metode forEach, ktora dla kazdego
    // elementu tablicy na ktorej zostala wywolana, wykonuje okreslona przez nas
    // funkcje przekazana jako argument forEach: 
    // 
    // https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/forEach
    //
    // no to lecimy ;)

    nav.forEach(function(item) {

      // zmienna item wewnatrz tej funkcji bedzie przyjmowala kolejne elementy tablicy nav,
      // czyli w pierwszym przebiegu item bedzie tym samym co nav[0], w kolejnym nav[1], itd.
      // w naszym przypadku w tablicy nav znajduja sie elementy HTML o klasie .dot

      // do kazdego elementu chcemy dodac event listener, ktory w momencie wystapienia zdarzenia
      // wykona okreslona funkcje - w naszym przypadku zmieni slajd
      // zdarzeniem ktorego bedziemy nasluchiwac bedzie zdarzenie "click", poniewaz chcemy
      // aby slajd zmienil sie po kliknieciu w konkretna kropke (element o klasie .dot)

      item.addEventListener('click', function() {

        // podobnie jak robilismy to wczesniej z poziomu onclick w HTML, po kliknieciu
        // w kropke chcemy wywolac funkcje currentSlide() z odpowiednim argumentem
        // ktory bedzie instruowal nasz skrypt, ktory slajd chcemy wyswietlic
        // z poziomu HTML moglismy podac numer slajdu "z reki", natomiast tutaj
        // musimy najpierw dowiedziec sie czy kropka ktora kliknal uzytkownik
        // jest 1, 2, 3 czy 15
        // mozna to zrobic na kilka sposobow, np. opierajac sie na kolejnosci elementow
        // w strukturze HTML:
        //   - jesli klikam 1 kropke, to chce zobaczyc 1 slajd
        //   - jesli klikam 2 kropke, to chce zobaczyc 2 slajd
        //   - itd.
        // kolejnosc elementow w drzewie DOM bedzie odzwierciedlona w zmiennej nav,
        // bo zostana one przypisane do tablicy w takiej kolejnosci w jakiej zostaly znalezione
        // czyli w kolejnosci wystepowania w drzewie DOM
        // ale tym razem zrobimy to troche inaczej, tak aby nie byc zaleznym od kolejnosci elementow
        // dodamy w HTML specjalny atrybut, w ktorym bedziemy deklarowac ktora kropka
        // ktory slajd oznacza, atrybut bedzie nazywal sie data-slide

        // pobieramy do zmiennej wartosc atrybutu data-slide konkretnej kliknietej kropki
        // i upewnimy sie ze bedzie to wartosc liczbowa rzutujac typ za pomoca funkcji parseInt()
        // obiekt this w tym przypadku jest rowny item, mozemy rownie dobrze uzyc ponizej zmiennej item
        var slideNum = parseInt(this.getAttribute('data-slide'));
        
        // teraz kiedy wiemy juz ktory slajd wyswietlic, mozemy wywolac funkcje
        // zmieniajaca slajdy, podajac jej numer slajdu przypisany do kliknietej kropki
        // aby nie wykonywac tej funkcji niepotrzebnie, sprawdzimy jeszcze uprzednio
        // czy slajd ktory chce wyswietlic uzytkownik nie jest juz aktualnie wyswietlany
        // czyli czy kropka jest przypisana do innego slajdu niz aktualnie wyswietlany
        // informacje o tym ktory slajd jest aktywny, mamy w zmiennej slideIndex
        // zatem wykonujemy proste porownanie

        if (slideNum != slideIndex) {
          currentSlide(slideNum);
        }        

        // i gotowe ;)
      });

    });
  }
})();
