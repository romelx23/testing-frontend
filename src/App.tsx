import logo from "./logo.svg";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { UIProvider } from "./context/ui/UIProvider";
import { FavoriteProvider } from "./context/favorite";
import { CartProvider } from "./context/cart";
import { AuthProvider } from "./context/auth";
import { ProductProvider } from "./context/product";
import { PlacesProvider } from "./context/places";
import { MapProvider } from "./context/map";
import { ProviderProvider } from "./context/provider";
// import { SocketProvider } from "./context/socket";

function App() {
  return (
    <div className="App">
      {/* <ProductsPage/> */}
      <UIProvider>
        <AuthProvider>
          <FavoriteProvider>
            <PlacesProvider>
              <MapProvider>
                <CartProvider>
                  <ProductProvider>
                    <ProviderProvider>
                      {/* <SocketProvider> */}
                      <AppRouter />
                      {/* </SocketProvider> */}
                    </ProviderProvider>
                  </ProductProvider>
                </CartProvider>
              </MapProvider>
            </PlacesProvider>
          </FavoriteProvider>
        </AuthProvider>
      </UIProvider>
    </div>
  );
}

export default App;
