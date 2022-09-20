const module = {
  productos: [],
  init: function () {
    this.cacheDom();
    this.bindingEvents();
  },
  cacheDom: function () {
    this.idInput = document.getElementById("idInput");
    this.productoInput = document.getElementById("productoInput");
    this.agregarBtn = document.getElementById("agregarBtn");
    this.editarBtn = document.getElementById("editarBtn");
    this.eliminarBtn = document.getElementById("eliminarBtn");
    this.buscarBtn = document.getElementById("buscarBtn");
  },
  bindingEvents: function () {
    this.agregarBtn.addEventListener("click", this.catch.bind(this));
    this.editarBtn.addEventListener("click", this.edit.bind(this));
    this.eliminarBtn.addEventListener("click", this.delete1.bind(this));
    this.buscarBtn.addEventListener("click", this.lookfor.bind(this));
  },

  catch: function () {
    const id = this.idInput.value;
    const productos = this.productoInput.value;
    const item = {
      id,
      productos,
    };

    const exist = this.productos.some((prod) => prod.id === id);

    if (exist !== true && id !== "") {
      this.add(item);
    }
  },
  add: function (newproductos) {
    this.productos.push(newproductos);
    this.paint(this.productos);
    this.clean();
  },
  edit: function () {
    const id = this.idInput.value;
    const productos = this.productoInput.value;
    const item = { id, productos };
    const index = this.productos.findIndex(
      (producto) => producto.id === item.id
    );
    if (index > -1) {
      this.productos.splice(index, 1, item);
    }

    this.paint(this.productos);
    this.clean();
  },
  delete: function (index) {
    const id = this.idInput.value;
    const productos = this.productoInput.value;
    const item = { id, productos };
    if (index > -1) {
      this.productos.splice(index, 1);
    }
    this.paint(this.productos);
    this.clean();
  },
  delete1: function () {
    const id = this.idInput.value;
    const newarray = this.productos.filter((item) => item.id !== id);
    this.productos = [...newarray];
    this.paint(this.productos);
    this.clean();
  },
  lookfor: function () {
    const id = this.idInput.value;
    const newarray = this.productos.filter((item) => item.id.includes(id));
    this.paint(newarray);
    this.clean();
  },
  paint: function (newarray) {
    const table = document.getElementById("table");
    const tbody = document.getElementById("tbody");
    const button = document.createElement("button");
    const btnText = document.createTextNode("add");
    const buttonE = document.createElement("button");
    const btnTextE = document.createTextNode("edit");
    const btn = document.readyState;
    button.appendChild(btnText);
    buttonE.appendChild(btnTextE);
    tbody.innerHTML = "";

    newarray.forEach((p) => {
      const tr = document.createElement("tr");

      let td = document.createElement("td");
      td.innerText = p.id;
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerText = p.productos;
      tr.appendChild(td);

      td = document.createElement("td");
      td.appendChild(this.creteButton("edit","fa fa-pencil","btn btn-warning me-2"));
      td.appendChild(this.creteButton("delete", "fa fa-trash", "btn btn-danger me-2"));
      tr.appendChild(td);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  },
  clean: function () {
    this.idInput.value = "";
    this.productoInput.value = "";
  },
  creteButton: function (id, iTxt, btnTxt) {
    const btn = document.createElement("button");
    const i = document.createElement("i");
    i.className = iTxt;
    btn.appendChild(i);
    btn.className = btnTxt;
    

    btn.addEventListener("click", (Event) => {
      select = btn.closest('tr').cells[0].textContent
      if (id === "edit") {        
        this.productos.forEach((p) => {
          if (p.id === select) {
            this.idInput.value = p.id;
            this.productoInput.value = p.prod_;
          }
        })
      };
      if (id === "delete") {
        let index=btn.closest('tr').rowIndex -1;
        this.productos.forEach((p) => {
          if (p.id === select) {            
          this.delete(index);
          }
        })
      };
    });

    return btn;
  },
};
module.init();
