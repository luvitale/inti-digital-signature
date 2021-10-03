import { RouteRecordRaw } from 'vue-router';
import Home from 'pages/Home.vue';
import GeneratePrivateKey from 'pages/DigitalSignature/GeneratePrivateKey.vue';
import GeneratePublicKey from 'pages/DigitalSignature/GeneratePublicKey.vue';
import GenerateDigest from 'pages/DigitalSignature/GenerateDigest.vue';
import Sign from 'pages/DigitalSignature/Sign.vue';
import Verify from 'pages/DigitalSignature/Verify.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  /*
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('app/Index.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  */
];

export default routes;
