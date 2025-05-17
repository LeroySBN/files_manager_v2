package ke.leroybuliro.apps.presentation.file_list

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import filesmanager.composeapp.generated.resources.Res
import filesmanager.composeapp.generated.resources.app_name
import filesmanager.composeapp.generated.resources.collections
import filesmanager.composeapp.generated.resources.documents
import filesmanager.composeapp.generated.resources.favorite_24px
import filesmanager.composeapp.generated.resources.favorite_fill_24px
import filesmanager.composeapp.generated.resources.favorite_tab
import filesmanager.composeapp.generated.resources.folder_shared_24px
import filesmanager.composeapp.generated.resources.folder_shared_fill_24px
import filesmanager.composeapp.generated.resources.home_24px
import filesmanager.composeapp.generated.resources.home_fill_24px
import filesmanager.composeapp.generated.resources.home_tab
import filesmanager.composeapp.generated.resources.logout
import filesmanager.composeapp.generated.resources.logout_24px
import filesmanager.composeapp.generated.resources.no_collections
import filesmanager.composeapp.generated.resources.no_documents
import filesmanager.composeapp.generated.resources.shared_tab
import ke.leroybuliro.apps.presentation.file_list.components.FileList
import ke.leroybuliro.apps.presentation.theme.DarkColorPalette
import ke.leroybuliro.apps.presentation.theme.LightColorPalette
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.resources.stringResource

//@Composable
//fun FileListScreenRoot(
//    viewModel: FileListViewModel = koinViewModel,
//) {
//    val state by viewModel.state.collectAsStateWithLifecycle()
//
//    FileListScreen(
//        state = state,
//        onAction = viewModel::onAction,
//    )
//}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FileListScreen(
    state: FileListState,
    onAction: (FileListAction) -> Unit,
    isDarkTheme: Boolean,
    onLogout: () -> Unit,
) {
    val pagerState = rememberPagerState{2}
    val documentListState = rememberLazyListState()
    val collectionListState = rememberLazyListState()
    var selectedItem by remember { mutableIntStateOf(0) }

    val items = listOf(
        stringResource(Res.string.home_tab),
        stringResource(Res.string.favorite_tab),
        stringResource(Res.string.shared_tab)
    )
    val selectedIcons = listOf(
        painterResource(Res.drawable.home_fill_24px),
        painterResource(Res.drawable.favorite_fill_24px),
        painterResource(Res.drawable.folder_shared_fill_24px)
    )
    val unselectedIcons = listOf(
        painterResource(Res.drawable.home_24px),
        painterResource(Res.drawable.favorite_24px),
        painterResource(Res.drawable.folder_shared_24px)
    )

    LaunchedEffect(state.documentList) {
        documentListState.animateScrollToItem(0)
    }

    LaunchedEffect(state.collectionList) {
        collectionListState.animateScrollToItem(0)
    }

    LaunchedEffect(state.selectedTabIndex) {
        pagerState.animateScrollToPage(state.selectedTabIndex)
    }

    LaunchedEffect(pagerState.currentPage) {
        onAction(FileListAction.OnTabSelected(pagerState.currentPage))
    }

    MaterialTheme(
        colorScheme = if (isDarkTheme)
                DarkColorPalette
            else
                LightColorPalette
    ) {
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.DarkGray)
                .statusBarsPadding(),
            color = MaterialTheme.colorScheme.background,
        ) {
            Scaffold(
                topBar = {
                    CenterAlignedTopAppBar(
                        title = {
                            Text(
                                text = stringResource(Res.string.app_name),
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        },
                        navigationIcon = {
                            IconButton(onClick = { /* doSomething() */ }) {
                                Icon(
                                    imageVector = Icons.Filled.AccountCircle,
                                    contentDescription = "Localized description"
                                )
                            }
                        },
                        actions = {
                            IconButton(onClick = { onLogout() }) {
                                Icon(
                                    painter = painterResource(Res.drawable.logout_24px),
                                    contentDescription = stringResource(Res.string.logout),
                                    tint = MaterialTheme.colorScheme.onSurface

                                )
                            }
                        },
                        colors = TopAppBarDefaults.topAppBarColors(
                            containerColor = Color.White,
                            titleContentColor = Color.Black,
                            navigationIconContentColor = Color.Black,
                            actionIconContentColor = Color.Black
                        )
                    )
                },
                bottomBar = {
                    NavigationBar(
                        containerColor = MaterialTheme.colorScheme.surfaceVariant,
                        contentColor = MaterialTheme.colorScheme.onSurfaceVariant
                    ) {
                        items.forEachIndexed { index, item ->
                            NavigationBarItem(
                                selected = selectedItem == index,
                                onClick = { selectedItem = index },
                                icon = {
                                    Icon(
                                        painter = if (selectedItem == index)
                                            selectedIcons[index]
                                        else
                                            unselectedIcons[index],
                                        contentDescription = item,
                                        tint = MaterialTheme.colorScheme.onSurface
                                    )
                                },
                                label = { Text(item) },
                            )
                        }
                    }
                }
            ){ innerPadding ->
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color.White)
                        .consumeWindowInsets(innerPadding)
                        .padding(innerPadding),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    TabRow(
                        selectedTabIndex = state.selectedTabIndex,
                        modifier = Modifier
                            .padding(vertical = 12.dp)
                            .fillMaxWidth(),
                        containerColor = Color.White,
                        indicator = { tabPositions ->
                            TabRowDefaults.SecondaryIndicator(
                                color = Color.Blue,
                                modifier = Modifier
                                    .tabIndicatorOffset(tabPositions[state.selectedTabIndex]),
                                height = 2.dp
                            )
                        }
                    ) {
                        Tab(
                            selected = state.selectedTabIndex == 0,
                            onClick = { onAction(FileListAction.OnTabSelected(0)) },
                            modifier = Modifier.weight(1f),
                            selectedContentColor = Color.Blue,
                            unselectedContentColor = Color.Black.copy(alpha = 0.5f)
                        ) {
                            Text(
                                text = stringResource(Res.string.documents),
                                style = MaterialTheme.typography.bodyMedium,
                                modifier = Modifier.padding(vertical = 12.dp)
                            )
                        }
                        Tab(
                            selected = state.selectedTabIndex == 1,
                            onClick = { onAction(FileListAction.OnTabSelected(1)) },
                            modifier = Modifier.weight(1f),
                            selectedContentColor = Color.Blue,
                            unselectedContentColor = Color.Black.copy(alpha = 0.5f)
                        ) {
                            Text(
                                text = stringResource(Res.string.collections),
                                style = MaterialTheme.typography.bodyMedium,
                                modifier = Modifier.padding(vertical = 12.dp)
                            )
                        }
                    }
                    HorizontalPager(
                        state = pagerState,
                        modifier = Modifier.fillMaxWidth()
                    ) { pageIndex ->
                        when (pageIndex) {
                            0 -> {
                                Box(
                                    modifier = Modifier
                                        .fillMaxSize(),
                                    contentAlignment = Alignment.Center
                                ) {
                                    if (state.isLoading) {
                                        CircularProgressIndicator()
                                    } else {
                                        when {
                                            state.error != null -> {
                                                Text(state.error)
                                            }

                                            state.documentList.isEmpty() -> {
                                                Text(
                                                    text = stringResource(Res.string.no_documents),
                                                    textAlign = TextAlign.Center,
                                                    style = MaterialTheme.typography.bodyMedium
                                                )
                                            }

                                            else -> {
                                                FileList(
                                                    files = state.documentList,
                                                    onFileClick = {
                                                        onAction(FileListAction.OnFileClick)
                                                    },
                                                    scrollState = documentListState,
                                                    modifier = Modifier.fillMaxSize(),
                                                )
                                            }
                                        }
                                    }
                                }
                            }

                            1 -> {
                                Box(
                                    modifier = Modifier
                                        .fillMaxSize(),
                                    contentAlignment = Alignment.Center
                                ) {

                                    if (state.collectionList.isEmpty()) {
                                        Text(
                                            text = stringResource(Res.string.no_collections),
                                            textAlign = TextAlign.Center,
                                            style = MaterialTheme.typography.bodyMedium
                                        )
                                    } else {
                                        FileList(
                                            files = state.collectionList,
                                            onFileClick = {
                                                onAction(FileListAction.OnFileClick)
                                            },
                                            scrollState = collectionListState,
                                            modifier = Modifier.fillMaxSize(),
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//@Composable
//fun DashboardScreen(
//    onLogout: () -> Unit,
//    isDarkTheme: Boolean,
//) {
//    MaterialTheme(colors = if (isDarkTheme) DarkColorPalette else LightColorPalette) {
//        Surface(
//            modifier = Modifier.fillMaxSize(),
//            color = MaterialTheme.colors.background
//        ) {
//            Column(
//                modifier = Modifier.fillMaxSize().padding(24.dp),
//                horizontalAlignment = Alignment.CenterHorizontally,
//                verticalArrangement = Arrangement.Center
//            ) {
//                Text("Access Granted", style = MaterialTheme.typography.h4)
//                Spacer(Modifier.height(32.dp))
//                Button(onClick = onLogout) {
//                    Text(StringResources.logout)
//                }
//            }
//        }
//    }
//}