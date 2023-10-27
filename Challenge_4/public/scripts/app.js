class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
    this.searchCars = document.getElementById("search-cars");
    this.tipeDriver = document.getElementById("tipe-driver")
    this.tanggal = document.getElementById("pilih-tanggal");
    this.waktu = document.getElementById("pilih-waktu");
    this.penumpang = document.getElementById("jumlah-penumpang");
  }

  async init() {
    await this.load();

    this.searchCars.onclick = this.run;
    this.run;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-6", "listCars")
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);

    this.searchCars.addEventListener("click", async (e) => {
      let valTipeDriver = this.tipeDriver.options[this.tipeDriver.selectedIndex].value;
      let valTanggal = this.tanggal.value;
      let valWaktu = this.waktu.options[this.waktu.selectedIndex].value;
      let valPenumpang = this.penumpang.value;

      this.clear()

      const cars = await Binar.listCars((car) => {
        let result = true;

        let dateTime = valTanggal + "T" + valWaktu;
        if ((!isNaN(Date.parse(dateTime))) && (!isNaN(parseInt(valPenumpang)))) {
          result = (car.availableAt.getTime() >= Date.parse(dateTime)) && (car.capacity >= parseInt(valPenumpang));
        }

        if (!isNaN(Date.parse(dateTime))) {
          result = car.availableAt.getTime() > Date.parse(dateTime);
        }

        let dateCar = valTanggal[9]
        if (!isNaN(parseInt(dateCar))) {
          result = car.availableAt.getDate() === parseInt(dateCar);
        }

        if (!isNaN(parseInt(valPenumpang))) {
          result = car.capacity === parseInt(valPenumpang);
        }

        return result;
      });

      console.log(cars);

      Car.init(cars);
    })
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  }
}