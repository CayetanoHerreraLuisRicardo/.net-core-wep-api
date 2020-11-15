/**
 * Interfaz utilizada para definir la configuración de un ventana modal
 * Para mas información: [https://valor-software.com/ngx-bootstrap/#/modals]
 */
export interface Modal {
    /**
     * Alternar animación
     */
    animated: boolean;
    /**
     * Incluir fondo.
     */
    backdrop: boolean;
    /**
     * Clase aplicada al modal: 'lg'| 'md' | 'sm'.
     */
    class: string;
    /**
     * Ignorar el clic de fondo (para que se cierre o no el modal al dar click fuera del modal o 'fondo').
     */
    ignoreBackdropClick: boolean;
    /**
     * Cierra el modal cuando se presiona la tecla de 'ESC'.
     */
    keyboard: boolean;
}