const app = Vue.createApp({
    data() {
        return {
          sitename: 'After School Classes',
          sortBy: 'subject',
          sortOrder: 'asc',
          showCart: false,
          cart: [],
          lessons: [
            { id: 1, subject: 'Maths', location: 'Hendon', price: 100, spaces: 5, icon: 'fa-solid fa-calculator' },
            { id: 2, subject: 'English', location: 'Colindale', price: 80, spaces: 5, icon: 'fa-solid fa-book' },
            { id: 3, subject: 'Music', location: 'Brent Cross', price: 90, spaces: 5, icon: 'fa-solid fa-music' },
            { id: 4,  subject: 'Art', location: 'Golders Green', price: 75, spaces: 5, icon: 'fa-solid fa-palette' },
            { id: 5,  subject: 'Science', location: 'Hendon', price: 110, spaces: 5, icon: 'fa-solid fa-flask' },
            { id: 6,  subject: 'Football', location: 'Colindale', price: 60,  spaces: 5, icon: 'fa-solid fa-futbol' },
            { id: 7,  subject: 'Coding', location: 'Brent Cross', price: 120, spaces: 5, icon: 'fa-solid fa-code' },
            { id: 8,  subject: 'Drama', location: 'Golders Green', price: 85,  spaces: 5, icon: 'fa-solid fa-masks-theater' },
            { id: 9,  subject: 'Chess', location: 'Hendon', price: 50,  spaces: 5, icon: 'fa-solid fa-chess' },
            { id: 10, subject: 'Swimming', location: 'Colindale', price: 95, spaces: 5, icon: 'fa-solid fa-person-swimming' }
          ]
        };
    },
    computed: {
        sortedLessons() {
            const sorted = [...this.lessons];
            sorted.sort((a, b) => {
                let result;
                if (typeof a[this.sortBy] === 'string') {
                    result = a[this.sortBy].localeCompare(b[this.sortBy]);
                } else {
                    result = a[this.sortBy] - b[this.sortBy];
                }
                return this.sortOrder === 'asc' ? result : -result;
            });
            return sorted;
        },
        cartItems() {
            return this.cart.map(id => this.lessons.find(lesson => lesson.id === id));
        },
        cartTotal() {
            return this.cartItems.reduce((total, lesson) => total + lesson.price, 0);
        }
    },
    methods: {
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                lesson.spaces--;
                this.cart.push(lesson.id);
            }
        },
        removeFromCart(index) {
            const id = this.cart[index];
            const lesson = this.lessons.find(l => l.id === id);
            lesson.spaces++;
            this.cart.splice(index, 1);
            if (this.cart.length === 0) {
                this.showCart = false;
            }
        }
    }

    });
    app.mount('#app');