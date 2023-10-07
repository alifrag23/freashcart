import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/nav-layout-blank/nav-layout-blank.component').then(
        (m) => m.NavLayoutBlankComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'home',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'products',
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'category',
      },
      {
        path: 'brand',
        loadComponent: () =>
          import('./components/brand/brand.component').then(
            (m) => m.BrandComponent
          ),
        title: 'brand',
      },
      {
        path: 'Brand/:id',
        loadComponent: () =>
          import('./components/specific-brand/specific-brand.component').then(
            (m) => m.SpecificBrandComponent
          ),
        title: 'brand',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'cart',
      },
      {
        path: 'productdetails/:id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
        title: 'productDetails',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        title: 'Payment',
      },
      {
        path: 'cashpayment/:id',
        loadComponent: () =>
          import('./components/cashpayment/cashpayment.component').then(
            (m) => m.CashpaymentComponent
          ),
        title: 'Payment',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'subCategory/:id',
        loadComponent: () =>
          import('./components/sub-category/sub-category.component').then(
            (m) => m.SubCategoryComponent
          ),
        title: 'subCategory',
      },
      {
        path: 'washlist',
        loadComponent: () =>
          import('./components/washlist/washlist.component').then(
            (m) => m.WashlistComponent
          ),
        title: 'washlist',
      },
      {
        path: 'updatepass',
        loadComponent: () =>
          import('./components/update-pass/update-pass.component').then((m) => m.UpdatePassComponent),
        title: 'UpdatePass',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/nav-layout-auth/nav-layout-auth.component').then(
        (m) => m.NavLayoutAuthComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgtPass',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'forgotPassword',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'NotFount',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
