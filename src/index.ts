// Definizione delle interfacce
interface IMezzo {
  tipo: string;
  id: string;
  stato: 'disponibile' | 'in uso';
  assegnaUtente(utente: IUtente): void;
}

interface IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;
  prenotaMezzo(mezzo: IMezzo): void;
}

interface ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];
  aggiungiMezzo(mezzo: IMezzo): void;
}

// Implementazione della classe Mezzo
class Mezzo implements IMezzo {
  tipo: string;
  id: string;
  stato: 'disponibile' | 'in uso';

  constructor(tipo: string, id: string) {
      this.tipo = tipo;
      this.id = id;
      this.stato = 'disponibile';
  }

  assegnaUtente(utente: IUtente): void {
      if (this.stato === 'disponibile') {
          this.stato = 'in uso';
          console.log(`Mezzo ${this.tipo} (ID: ${this.id}) assegnato a ${utente.nome} ${utente.cognome}`);
      } else {
          console.log(`Mezzo ${this.tipo} (ID: ${this.id}) non disponibile`);
      }
  }
}

// Implementazione della classe Utente
class Utente implements IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;

  constructor(nome: string, cognome: string, email: string, metodoPagamento: string) {
      this.nome = nome;
      this.cognome = cognome;
      this.email = email;
      this.metodoPagamento = metodoPagamento;
  }

  prenotaMezzo(mezzo: IMezzo): void {
      if (mezzo.stato === 'disponibile') {
          mezzo.assegnaUtente(this);
      } else {
          console.log(`Il mezzo ${mezzo.tipo} non è disponibile per la prenotazione`);
      }
  }
}

// Implementazione della classe Citta
class Citta implements ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];

  constructor(nome: string) {
      this.nome = nome;
      this.mezziDisponibili = [];
  }

  aggiungiMezzo(mezzo: IMezzo): void {
      this.mezziDisponibili.push(mezzo);
      console.log(`Mezzo ${mezzo.tipo} (ID: ${mezzo.id}) aggiunto alla città ${this.nome}`);
  }
}

// Creazione di alcuni oggetti Mezzo
const bici1 = new Mezzo('bici', 'B001');
const scooter1 = new Mezzo('scooter', 'S001');
const monopattino1 = new Mezzo('monopattino', 'M001');

// Creazione di alcuni oggetti Utente
const utente1 = new Utente('Mario', 'Rossi', 'mario.rossi@example.com', 'Carta di Credito');
const utente2 = new Utente('Giulia', 'Verdi', 'giulia.verdi@example.com', 'PayPal');

// Creazione di un'istanza della classe Citta
const milano = new Citta('Milano');

// Aggiunta dei mezzi alla città
milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(scooter1);
milano.aggiungiMezzo(monopattino1);

// Test della logica di prenotazione
utente1.prenotaMezzo(bici1);  // Mario prenota una bici
utente2.prenotaMezzo(bici1);  // Giulia tenta di prenotare la stessa bici già in uso
utente2.prenotaMezzo(scooter1); // Giulia prenota uno scooter
