import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// Top nav links — routes taken from your existing Navbar component.
const pages = [
  { label: 'Signup', to: '/singup' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Support', to: '/support' },
];

// Top row: main products. Swap `img` with a real image URL/import when ready.
// Update `to` to point at each product's actual route.
const products = [
  { name: 'Kite', desc: 'Trading platform', img: "kite.png", to: '/singup' },
  { name: 'Console', desc: 'Backoffice', img: null, to: '/singup' },
  { name: 'Kite Connect', desc: 'Trading APIs', img: null, to: '/singup' },
  { name: 'Coin', desc: 'Mutual funds', img: null, to: '/singup' },
];

// Bottom section: link columns. `links` are {label, to} pairs,
// `items` (optional) are icon + label + to, like Varsity / Trading Q&A.
const menuColumns = [
  {
    title: 'Utilities',
    links: [
      { label: 'Calculators', to: '/singup' },
      { label: 'Brokerage calculator', to: '/singup' },
      { label: 'Margin calculator', to: '/singup' },
      { label: 'SIP calculator', to: '/singup' },
    ],
  },
  {
    title: 'Updates',
    links: [
      { label: 'Z-Connect blog', to: '/singup' },
      { label: 'Circulars / Bulletin', to: '/singup' },
      { label: 'IPOs', to: '/singup' },
      { label: 'Markets', to: '/singup' },
    ],
  },
  {
    title: 'Education',
    items: [
      { name: 'Varsity', img: null, to: '/singup' },
      { name: 'Trading Q&A', img: null, to: '/singup' },
    ],
  },
];

// Reusable placeholder image box — replace `src` with a real image to use it.
function PlaceholderImg({ size = 48, src }) {
  if (src) {
    return (
      <Box
        component="img"
        src={src}
        alt=""
        sx={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '8px',
        backgroundColor: '#eef1f4',
        border: '1px dashed #c7ccd1',
      }}
    />
  );
}

function Navbar1() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eef0f2',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          {/* Logo — swap the src for your real logo path if it's not media/logo.svg */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <Box
              component="img"
              src="media/logo.svg"
              alt="logo"
              sx={{ width: '9rem' }}
            />
          </Box>

          {/* Spacer pushes nav links + hamburger to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop nav links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.to}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1.5,
                  px: 0,
                  minWidth: 'auto',
                  color: '#5a6570',
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#387ed1',
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Hamburger menu (always visible, far right) */}
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ ml: { xs: 1, md: 3 }, color: '#5a6570' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            slotProps={{
              paper: {
                sx: {
                  width: { xs: '92vw', sm: 640, md: 760 },
                  maxWidth: '95vw',
                  borderRadius: '10px',
                  overflow: 'hidden',
                },
              },
            }}
          >
            {/* Top row: product cards */}
            <Box sx={{ px: 3, py: 3 }}>
              <Grid container spacing={3}>
                {products.map((p) => (
                  <Grid item xs={6} sm={3} key={p.name}>
                    <Box
                      component={Link}
                      to={p.to}
                      onClick={handleCloseNavMenu}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        gap: 0.75,
                      }}
                    >
                      <PlaceholderImg size={44} src={p.img} />
                      <Typography sx={{ fontWeight: 700, color: '#3a3f45', fontSize: '1rem' }}>
                        {p.name}
                      </Typography>
                      <Typography sx={{ color: '#9aa1a8', fontSize: '0.85rem' }}>
                        {p.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider />

            {/* Bottom section: link columns */}
            <Box sx={{ px: 3, py: 3, backgroundColor: '#fafbfc' }}>
              <Grid container spacing={4}>
                {menuColumns.map((col) => (
                  <Grid item xs={12} sm={4} key={col.title}>
                    <Typography
                      sx={{ fontWeight: 700, color: '#3a3f45', fontSize: '1.05rem', mb: 1.5 }}
                    >
                      {col.title}
                    </Typography>

                    {col.links && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                        {col.links.map((link) => (
                          <Typography
                            key={link.label}
                            component={Link}
                            to={link.to}
                            onClick={handleCloseNavMenu}
                            sx={{
                              color: '#5a6570',
                              fontSize: '0.95rem',
                              textDecoration: 'none',
                              cursor: 'pointer',
                              width: 'fit-content',
                              '&:hover': { color: '#387ed1' },
                            }}
                          >
                            {link.label}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    {col.items && (
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        {col.items.map((item) => (
                          <Box
                            key={item.name}
                            component={Link}
                            to={item.to}
                            onClick={handleCloseNavMenu}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 0.75,
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            <PlaceholderImg size={40} src={item.img} />
                            <Typography sx={{ color: '#5a6570', fontSize: '0.9rem' }}>
                              {item.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar1;