import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  /*
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/generate-private-key',
    name: 'GeneratePrivateKey',
    component: GeneratePrivateKey,
  },
  {
    path: '/generate-public-key',
    name: 'GeneratePublicKey',
    component: GeneratePublicKey,
  },
  {
    path: '/generate-digest',
    name: 'GenerateDigest',
    component: GenerateDigest,
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
  },
  */

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },

  {
    path: '/generate-private-key',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DigitalSignature/GeneratePrivateKey.vue') }],
  },
  {
    path: '/generate-private-key',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DigitalSignature/GeneratePrivateKey.vue') }],
  },
  {
    path: '/generate-public-key',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DigitalSignature/GeneratePublicKey.vue') }],
  },
  {
    path: '/generate-digest',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DigitalSignature/GenerateDigest.vue') }],
  },
  {
    path: '/sign',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DigitalSignature/Sign.vue') }],
  },
  {
    path: '/verify',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DigitalSignature/Verify.vue') }],
  },

  /*
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  */
];

export default routes;
