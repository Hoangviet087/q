var app = angular.module("myApp", []);
app.controller("cartCtrl", function() {})

app.controller("productCtrl", function($scope, $http, cartService) {
    $http.get('/js/products.json').then(function(response) {
        $scope.products = response.data;
    });
    $scope.addToCart = function(product) {
        cartService.addToCart(product);
        $scope.cartCount = cartService.getCartItems().length;
    };
    $scope.cartCount = cartService.getCartItems().length;
});

app.controller("cartCtrl", function($scope, cartService) {
    $scope.cartItems = cartService.getCartItems();
    $scope.getTotal = cartService.getTotal;

    $scope.incrementItem = function(item) {
        cartService.incrementItem(item);
    };
    $scope.decrementItem = function(item) {
        cartService.decrementItem(item);
    };
    $scope.removeItem = function(item) {
        cartService.removeItem(item);
    };
});


app.service("cartService", function() {
    var cartItems = sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [];

    return {
        getCartItems: function() {
            return cartItems;
        },

        addToCart: function(product) {
            var itemIndex = cartItems.findIndex(function(item) {
                return item.name ===


                    product.name;
            });

            if (itemIndex === -1) {
                cartItems.push({
                    photo: product.photo,
                    name: product.name,
                    sale1: product.sale1,
                    price: product.price,
                    quantity: 1
                });
            } else {
                cartItems[itemIndex].quantity++;
            }

            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        },

        incrementItem: function(item) {
            item.quantity++;
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        },

        decrementItem: function(item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                var index = cartItems.indexOf(item);
                cartItems.splice(index, 1);
            }

            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        },

        removeItem: function(item) {
            var index = cartItems.indexOf(item);
            if (index !== -1) {
                cartItems.splice(index, 1);
            }

            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        },

        getTotal: function() {
            var total = 0;
            for (var i = 0; i < cartItems.length; i++) {
                total += cartItems[i].price * cartItems[i].quantity;
            }
            return total;
        }

    };
});