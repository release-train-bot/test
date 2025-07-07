package shared.presentation.ui.icon

import multiplatform1.shared.presentation.generated.resources.Res
import multiplatform1.shared.presentation.generated.resources.ic_arrow_back
import multiplatform1.shared.presentation.generated.resources.ic_cancel

object DsIcons {

    val cancel: DsIconModel
        get() = DsIconModel.DrawableResource(Res.drawable.ic_cancel)
    val arrowBack: DsIconModel
        get() = DsIconModel.DrawableResource(Res.drawable.ic_arrow_back)
}
