class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
        <div class="gambarMobil">
            <img src=${this.image}>
        </div>
        <p>${this.manufacture} - ${this.model}</p>
        <p class="hargaPerHari">Rp ${this.rentPerDay} / hari</p>
        <p>${(this.description) !== "" ? `${this.description}` : `${this.description}`}</p>
        <div class="orang">
            <img src="./images/users.png">
            <p>${this.capacity} orang</p>
        </div>
        <div class="setting">
            <img src="./images/setting.png">
            <p>${this.transmission}</p>
        </div>
        <div class="tahun">
            <img src="./images/calender.png">
            <p>Tahun ${this.year}</p>
        </div>
        <button class="btn btn-pilihMobil">Pilih Mobil</button>
    `;
  }
}
