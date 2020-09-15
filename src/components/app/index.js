import * as css from "./index.css";
console.log(css);

export default class App {
  constructor(elem) {
    if (!elem) return;
    this.elem = elem;

    isAuthenticated$.pipe(rxjs.operators.skip(1)).subscribe((value) => {
      if (value) {
        document.getElementById("logged-in-content").style.display = "block";
        document.getElementById("logged-out-content").style.display = "none";

        document.getElementById(
          "fun-wallet-follower"
        ).src = window.funwallet.getWalletFollowerURL();
      } else {
        document.getElementById("logged-in-content").style.display = "none";
        document.getElementById("logged-out-content").style.display = "block";
      }
      document.getElementById("loading").style.display = "none";
    });

    restoreAuthenticationTaskCompleted$
      .pipe(rxjs.operators.skip(1))
      .subscribe((value) => {
        if (value && !isAuthenticated$.value) {
          document.getElementById("loading").style.display = "none";
          document.getElementById("logged-in-content").style.display = "none";
          document.getElementById("logged-out-content").style.display = "block";
        }
      });
  }

  render() {
    if (this.elem)
      this.elem.innerHTML = `
        <section data-component="app">
          <img src="./logo.svg" id="logo" alt="logo" />
          <p id="loading">Loading please wait...</p>
          <div id="content">
            <div id="logged-out-content">
              <div id="logged-out-actions">
                <button onclick="login()">Login</button>
              </div> 
            </div>

            <div id="logged-in-content">
              <div id="logged-in-actions">
                 <button onclick="signAMessage()">Sign message</button>
                 <button onclick="sendSignedTransaction()">Send signed transaction</button>
                 <button onclick="openKycProcess()">Start KYC</button>
                 <button onclick="logout()">Logout</button>
              </div>
              <iframe
                id="fun-wallet-follower"
                onload="followerLoaded()"
                is-fun-wallet="true"
                is-follower="true"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </section>
        `;
  }
}
