export function exigirLogin(req, res, next) {
    if (req.session.usuarioId) {
        next(); // deixa passar
    } else {
        res.redirect("/login");
    }
}

// NÃO ALTERE OS COMANDOS ACIMA !!!!!!!!!!