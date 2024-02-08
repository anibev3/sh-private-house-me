  <div
    class="snackbar-toast bg-green1-dark color-white text-center"
    style="
      margin-bottom: calc(
        100px + (env(safe-area-inset-bottom)) * 1.1
      ) !important;
      background-color: rgb(193, 14, 14) !important;
      color: white;
    "
    *ngIf="showSnackbar"
  >
    <i class="fa fa-shopping-cart"></i>Remplissez tous les champs
  </div>

  <!-- Netlify -->

[[redirects]]
from = "/\*"
to = "index.html"
status = 2000

<!-- Pour masquer une partie du contenu -->

  <!-- variable -->

showFullRules = false;

  <!-- fonction -->

toggleShowFullRules() {
this.showFullRules = !this.showFullRules;
}

  <!-- html -->

                    <div>
                    <ng-container *ngIf="showFullRules; else truncatedRules">
                      <div style="white-space: pre-line">
                        {{ roomdetails?.rules }}
                      </div>
                      <button (click)="toggleShowFullRules()">Voir moins</button>
                    </ng-container>
                    <ng-template #truncatedRules>
                      <div style="white-space: pre-line">
                        {{
                          roomdetails?.rules.slice(0, maxDisplayedChars) + "..."
                        }}
                      </div>
                      <button (click)="toggleShowFullRules()">Voir plus</button>
                    </ng-template>
                  </div>

---

<p style="color: grey; font-size: 12px">
                          {{
                            item?.order === 0
                              ? "Très belle résidence"
                              : "Plus de " + item?.order + " réservations"
                          }}
                        </p>

    <div class="col-xxl-9 col-lg-8 custom-box-loader">
      <!---->
      <button
        class="btn btn-animation btn-md d-block d-lg-none fw-bold left-dashboard-show mb-4"
        id="show_menu"
        type="button"
      >
        <div>Show Menu</div>
      </button>
      <div class="dashboard-right-sidebar">
        <div class="tab-content">
          <!-- <router-outlet></router-outlet> -->
          <div class="ng-star-inserted">
            <div class="tab-pane fade show active">
              <div class="dashboard-home">
                <div class="title-header">
                  <div class="d-flex align-items-center">
                    <h5>My Dashboard</h5>
                  </div>
                </div>
                <div class="dashboard-user-name">
                  <h6 class="text-content">
                    Hello,
                    <b class="text-title">John Doe</b>
                  </h6>
                  <p class="text-content">
                    Welcome to your personalized My Account Dashboard. Here,
                    you have the power to manage your entire e-commerce
                    experience in one place. Whether you're exploring the
                    latest products, checking your wallet balance, or updating
                    your profile, everything is at your fingertips
                  </p>
                </div>
                <div class="total-box">
                  <div class="row row-cols-xxl-3 g-sm-4 g-3">
                    <div>
                      <div class="totle-contain">
                        <div class="wallet-point-box">
                          <img
                            src="assets/images/svg/wallet.svg"
                            alt="wallet"
                            class="img-1"
                          /><img
                            src="assets/images/svg/wallet.svg"
                            alt="wallet"
                          />
                          <div class="totle-detail">
                            <h5>Balance</h5>
                            <h3>$ 84.40</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="totle-contain">
                        <div class="wallet-point-box">
                          <img
                            src="assets/images/svg/coin.svg"
                            alt="coin"
                            class="img-1"
                          /><img
                            src="assets/images/svg/coin.svg"
                            alt="coin"
                          />
                          <div class="totle-detail">
                            <h5>Total Points</h5>
                            <h3>300</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="totle-contain">
                        <div class="wallet-point-box">
                          <img
                            src="assets/images/svg/order.svg"
                            alt="order"
                            class="img-1"
                          /><img
                            src="assets/images/svg/order.svg"
                            alt="order"
                          />
                          <div class="totle-detail">
                            <h5>Total Orders</h5>
                            <h3>7</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="profile-about dashboard-bg-box">
                  <div class="row">
                    <div class="col-xxl-7">
                      <div class="dashboard-title mb-3">
                        <h3>Profile Information</h3>
                      </div>
                      <div class="table-responsive">
                        <table class="table">
                          <tbody>
                            <tr>
                              <td>Name:</td>
                              <td>John Doe</td>
                            </tr>
                            <tr>
                              <td>Phone:</td>
                              <td>+1 5551855359</td>
                            </tr>
                            <tr class="ng-star-inserted">
                              <td>Address:</td>
                              <td>
                                26, Starts Hollow Colony Denver, Colorado,
                                United States 80014
                              </td>
                            </tr>
                            <!---->
                          </tbody>
                        </table>
                      </div>
                      <div class="dashboard-title mb-3">
                        <h3>Login Details</h3>
                      </div>
                      <div class="table-responsive">
                        <table class="table">
                          <tbody>
                            <tr>
                              <td>Email :</td>
                              <td>
                                john.customer@example.com
                                <a href="javascript:void(0)">Edit</a>
                              </td>
                            </tr>
                            <tr>
                              <td>Password :</td>
                              <td>
                                ●●●●●●
                                <a href="javascript:void(0)">Edit</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col-xxl-5">
                      <div class="profile-image">
                        <img
                          src="assets/images/inner-page/dashboard-profile.png"
                          alt="dashboard-profile"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <app-edit-profile-modal _nghost-ng-c1241341672=""
                ></app-edit-profile-modal
              ><app-change-password-modal _nghost-ng-c797858041=""
                ></app-change-password-modal
              ></
            > -->
          </div>
        </div>
      </div>
    </div>
