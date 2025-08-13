import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlMatchResult, UrlSegment } from '@angular/router';

export const slugMatcher = (segments: UrlSegment[]): UrlMatchResult | null => {
  if (segments.length === 1) {
    const slug = segments[0].path;
    const reserved = new Set(['painel', 'not-found']);
    if (reserved.has(slug)) {
      return null
    };
    return {
      consumed: segments,
      posParams: {
        slug: new UrlSegment(slug, {})
      }
    };
  }
  return null;
};

export const slugExistenceGuard: CanActivateFn = (route, _) => {
  const slug = route.paramMap.get('slug');
  const router = inject(Router);
  const reserved = new Set(['painel', 'not-found']);
  if (!slug || reserved.has(slug))
    return router.createUrlTree(['/not-found']);
  // TODO: Replace with actual service call to check if the slug exists
  const mockCompanyExists = false;
  if (!mockCompanyExists)
    return router.createUrlTree(['/not-found']);
  return true;
};
