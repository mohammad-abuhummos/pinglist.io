import { useCallback, useEffect, useRef, useState } from 'react';
import { initializePaddle } from '@paddle/paddle-js';
import { config } from '../config';

export function usePaddle(onCheckoutCompleted) {
  const paddleRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!config.paddleClientToken) {
      setError('Checkout is not configured yet.');
      return undefined;
    }

    let cancelled = false;
    initializePaddle({
      environment: config.paddleEnv,
      token: config.paddleClientToken,
      eventCallback(event) {
        if (event.name === 'checkout.completed') {
          onCheckoutCompleted?.(event);
        }
      },
    })
      .then((instance) => {
        if (!cancelled && instance) {
          paddleRef.current = instance;
          setReady(true);
          setError('');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not start checkout.');
      });

    return () => {
      cancelled = true;
    };
  }, [onCheckoutCompleted]);

  const openCheckout = useCallback(
    ({ email, userId }) => {
      if (!paddleRef.current) {
        throw new Error(error || 'Checkout is not ready.');
      }
      if (!config.paddlePriceId) {
        throw new Error('Checkout is not configured yet.');
      }

      paddleRef.current.Checkout.open({
        items: [{ priceId: config.paddlePriceId, quantity: 1 }],
        customer: email ? { email } : undefined,
        customData: { userId: String(userId) },
        settings: {
          successUrl: `${config.siteUrl}/account?checkout=success`,
          allowLogout: false,
        },
      });
    },
    [error]
  );

  return {
    ready,
    error,
    configured: Boolean(config.paddleClientToken && config.paddlePriceId),
    openCheckout,
  };
}
